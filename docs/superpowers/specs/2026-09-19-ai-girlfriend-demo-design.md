# AI 女友机器人学习演示设计

## 目标与边界

本项目演示 Python 接收 go-cqhttp 的反向 HTTP 消息事件、生成本地模拟回复、维护短上下文，以及把文字保存为 TTS 音频。仅处理私聊，不处理群聊。

项目不包含绕过 QQ 安全校验、强制 Hook、篡改客户端、登录自动化或真实通话能力。语音通话相关类只输出模拟日志，用于说明代码分层，不能在真实 QQ 上接听电话或传输通话音频。

## 组成

- `Flask` HTTP 服务：接收 `POST /cqhttp/event` 事件。
- `MockChatProvider`：按甜美温柔、口语化、带少量语气词和表情的规则生成模拟回复；按用户 ID 保存最近 4 条对话。
- 可替换模型接口：定义协议和占位类，后续可接入 OpenAI 兼容 HTTP 接口或 Ollama；本版本不读取 API 密钥、不发送模型请求。
- `TTSService`：可选地使用 `edge-tts` 将回复生成 MP3，保存至 `audio/`；TTS 是在线服务，文本会被发送给对应的语音服务，不应传入敏感内容。
- `QQBotClient`：仅调用 go-cqhttp 的 `send_private_msg` HTTP 接口发送文字私聊回复。
- `VoiceCallDemo`：理论演示类；不调用 QQ、go-cqhttp、系统音频或客户端接口。

## 数据流

1. go-cqhttp 将消息事件 POST 至 Python 服务。
2. 服务只接受 `post_type=message`、`message_type=private` 且非机器人自身的事件。
3. 机器人读取该用户的短上下文，调用本地模拟回复器。
4. 机器人把本轮问答写回内存上下文。
5. 若 `ENABLE_TTS=true`，生成 MP3 音频文件；不把音频发送到 QQ。
6. 机器人通过本机 go-cqhttp HTTP API 发送文字回复。

## 配置

环境变量：

- `CQHTTP_API_BASE`：go-cqhttp 本机 HTTP API 地址，默认 `http://127.0.0.1:5700`。
- `CQHTTP_ACCESS_TOKEN`：可选访问令牌。
- `BOT_QQ`：机器人 QQ 号，用于过滤自身消息。
- `ENABLE_TTS`：是否生成本地 MP3，默认关闭。
- `TTS_VOICE`：edge-tts 音色名称。
- `TTS_OUTPUT_DIR`：音频目录，默认 `audio`。

## 异常与安全处理

- 忽略无效事件、群消息、机器人自身消息和空白消息。
- go-cqhttp API 与 TTS 调用设置超时；失败仅记录中文日志，不中断服务。
- 音频文件名只使用受控的 UUID，避免路径注入。
- 访问令牌只能放在环境变量，不写入源码或 README。
- 模拟回复会提示其为学习演示，不声称为真实的人类。

## 验证计划

- 运行 `python -m py_compile ai_girlfriend.py` 验证语法。
- 用 Flask 测试客户端提交私聊事件，验证得到文字回复。
- 用群消息事件验证返回“忽略”且不调用发送接口。
- 用 `ENABLE_TTS=false` 验证默认不产生网络语音请求。
- 调用 `VoiceCallDemo` 验证仅产生模拟日志。
