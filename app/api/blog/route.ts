import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin-session')?.value === 'authenticated';
}

// GET - List all blog posts
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blogDir = path.join(process.cwd(), 'content/blog');
    const categoryDirs = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const posts = [];
    
    for (const categorySlug of categoryDirs) {
      const categoryPath = path.join(blogDir, categorySlug);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContent);
        const slug = file.replace('.md', '');
        
        posts.push({
          slug,
          category: categorySlug,
          frontmatter,
          fileName: file
        });
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, category, excerpt, content, heroImage, readingTime } = await request.json();
    
    // Validate required fields
    if (!title || !slug || !category || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create directory if it doesn't exist
    const categoryDir = path.join(process.cwd(), 'content/blog', category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Check if file already exists
    const filePath = path.join(categoryDir, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 400 }
      );
    }

    // Calculate reading time if not provided
    const calculatedReadingTime = readingTime || `${Math.ceil(content.split(' ').length / 200)} min`;

    // Build markdown content
    const date = new Date().toISOString().split('T')[0];
    const markdownContent = matter.stringify(content, {
      title,
      date,
      category,
      excerpt: excerpt || '',
      heroImage: heroImage || '',
      readingTime: calculatedReadingTime
    });

    // Write file
    fs.writeFileSync(filePath, markdownContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      slug,
      category
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}