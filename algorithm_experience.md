# Waveform-Logmel Dual Stream Fusion Network for Sound Event Detection
当时的想法来源很简单， 就是觉得语音信号可以有声谱图和波谱图， 那是不是可以围绕这两个信号进行一个分别学习然后再融合呢（现在想有点Co- Training的味道在里面）
[飞书画板](https://vrfi1sk8a0.feishu.cn/wiki/Kv0HwiQgyiCxi0kepmic3rirnod?larkTabName=space#share-QT9TdUEK4oWlYXxEFStcZIc1nJc)

图片存储名字：dual_stream_NN.png
# Hierarchical Temporal Attention and Competent Teacher Network（ICME-CCFB）
暂时无法在飞书文档外展示此内容
主要工作涉及：
模型架构优化：
ICME_network.png

1. 分层时序注意力机制（HTA）
全局时序建模与跨通道融合：
    - 传统卷积神经网络（CNN）由于感受野有限，难以捕捉长时序依赖关系。HTA 通过引入 全局注意力模块（GAM），利用全连接层的扩展感受野，捕捉长时序依赖关系，实现全局时序增强。
    - HTA 还设计了 通道自适应融合模块（CAFM），通过 1x1 卷积实现跨通道信息交换，自适应地增强通道特征表达，从而构建跨通道关联，弥补了传统方法忽略时频特征间相互依赖关系的不足。
多尺度时序特征提取：
    - HTA 包含 局部依赖模块（LDM），采用两个卷积块和一个跳跃连接块，提取局部时序特征。
    - 通过 LDM 和 GAM 的协同工作，HTA 能够实现多尺度时序特征提取，捕捉更丰富的时序模式。
时频特征融合：
    HTA 将时序特征与频率特征图进行融合，进一步提升了对复杂声学环境的适应能力。

训练方法优化（蒸馏-师生网络）：

使用半监督的Mean-Teacher 网络框架，优化损失函数从而缓解教师网络传给学生的错误知识，提升模型的泛化能力：
- 引入一个置信度权重$$W_T
$$：教师置信度高的结果权重更高（老师：我对我的答案很自信👀）
- 引入background Loss$$L^{bg}$$：鉴错能力也要算个loss， 更好的优化
优化Mean-Teacher的训练策略
TS_network.png

https://vrfi1sk8a0.feishu.cn/wiki/Kv0HwiQgyiCxi0kepmic3rirnod?larkTabName=space#share-GOPDdi1DBoqffyx60KFcEnR6nSb
胜任教师网络（CTN）
- 教师模型知识引导：
  - CTN 引入了 胜任损失权重（CLW），利用教师模型在无监督损失中的丰富知识来指导学生模型学习。CLW 通过对教师模型的弱预测结果进行 softmax 归一化，削弱低概率预测的影响，并为学生模型提供积极反馈。
- 非目标事件建模：
  - CTN 引入 背景损失（BL），用于学习非目标事件知识。BL 通过计算教师和学生模型对背景事件发生概率的均方误差，鼓励学生模型更准确地识别背景事件。
- 减少对强标签数据的依赖：
  - 通过 CLW 和 BL，CTN 有效地引导学生在缺乏强标签数据的情况下进行学习，减少了对强标签数据的依赖。
总结： CTN 通过引导教师模型的知识传递和加强非目标事件建模，提升了模型在半监督学习场景下的表现，并增强了模型对复杂声学环境的适应能力。


一些专利的架构设计(通道注意力+残差门控）