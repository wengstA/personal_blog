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

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, slug } = await params;
    const filePath = path.join(process.cwd(), 'content/blog', category, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    return NextResponse.json({
      slug,
      category,
      frontmatter,
      content
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, slug } = await params;
    const { title, newSlug, newCategory, excerpt, content, heroImage, readingTime } = await request.json();
    
    // Validate required fields
    if (!title || !newSlug || !newCategory || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const oldFilePath = path.join(process.cwd(), 'content/blog', category, `${slug}.md`);
    
    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Read existing post to get original date
    const existingContent = fs.readFileSync(oldFilePath, 'utf8');
    const { data: existingFrontmatter } = matter(existingContent);

    // Calculate reading time if not provided
    const calculatedReadingTime = readingTime || `${Math.ceil(content.split(' ').length / 200)} min`;

    // Build updated markdown content
    const markdownContent = matter.stringify(content, {
      title,
      date: existingFrontmatter.date, // Keep original date
      category: newCategory,
      excerpt: excerpt || '',
      heroImage: heroImage || '',
      readingTime: calculatedReadingTime
    });

    // Create new directory if category changed
    const newCategoryDir = path.join(process.cwd(), 'content/blog', newCategory);
    if (!fs.existsSync(newCategoryDir)) {
      fs.mkdirSync(newCategoryDir, { recursive: true });
    }

    const newFilePath = path.join(newCategoryDir, `${newSlug}.md`);

    // Check if new path conflicts with existing file (unless it's the same file)
    if (newFilePath !== oldFilePath && fs.existsSync(newFilePath)) {
      return NextResponse.json(
        { error: 'A post with this slug already exists in the target category' },
        { status: 400 }
      );
    }

    // Write updated content
    fs.writeFileSync(newFilePath, markdownContent, 'utf8');

    // Delete old file if path changed
    if (newFilePath !== oldFilePath) {
      fs.unlinkSync(oldFilePath);
    }

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      slug: newSlug,
      category: newCategory
    });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, slug } = await params;
    const filePath = path.join(process.cwd(), 'content/blog', category, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}