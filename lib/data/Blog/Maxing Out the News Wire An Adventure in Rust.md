---
tags: blog/programming, blog/rust, blog/trading
date: June 6, 2023
publish: true
image: Blog/Assets/fakhoury_speedy_maglev_train_futuristic_glowing_painting_f7da476e-df2a-4dfa-b577-e2d34caf00d2.png
slug: blazing-fast-rss-watcher
origin:
description: 
---
# Maxing Out the News Wire: An Adventure in Rust

In the world of finance, every millisecond counts. The faster you can get information, the quicker you can make decisions. This is especially true at Mechanism Capital, where I need to stay ahead of the curve, always ready to act on the latest news. That's why I've developed the [Blazing Fast RSS Watcher](https://github.com/brianfakhoury/blazing-fast-rss-watcher), a project that combines the power of Rust, the simplicity of containerization, and the speed of low latency systems to deliver news as it happens.

![Telegram screenshot of message sent from program](Blog/Assets/Screenshot%202023-06-06%20at%203.56.15%20PM.png)

## The Need for Speed

The Blazing Fast RSS Watcher was born out of necessity. I needed a way to get instant alerts about new articles, allowing our trading desk to have a raw feed of headlines at their fingertips. But I didn't just want any RSS watcher (we already had one set one up). I wanted one that was fast. Blazing fast. And that's where Rust comes in.

Rust is a systems programming language that guarantees thread safety and prevents *segfaults*. It's known for its speed and memory safety, making it the perfect choice for this project. Not only did it allow us to create a high-performance RSS watcher, but it also gave me a chance to improve my Rust abilities. 

Here's a snippet showing how Rust isn't all that alien to an interpreter-lover like me:

```rust
for item in channel.items() {
    let title = item.title().unwrap_or_default().to_owned();
    let description = item.description().unwrap_or_default().to_owned();
    let link = item.link().unwrap_or_default().to_owned();

    let article = ArticleInfo {
        title: title.clone(),
        description: description.clone(),
        link: link.clone(),
    };

    // Depending on the mode, do something with the article...
}
```

## Containerization and Simplicity

In addition to speed, I also wanted our RSS watcher to be simple and easy to deploy. That's why I focused on containerization. By packaging the application into a container, I can deploy it anywhere, easily - whether it's on a local machine or a Linux server in the cloud.

I'm also planning on rounding out the project with full websub support. This will make deployment even faster, allowing us to get our RSS watcher up and running in no time.

Simplicity was another goal of this project. For this, I focused on creating a single asynchronous function that could be called to start processing RSS feeds. The `main()` function in `main.rs` pulls this off elegantly:

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = AppConfig::from_env_args()?;

    process_rss_feeds(&config).await?;

    Ok(())
}
```

## Pushing the Limits

There's a certain joy in making really fast software. It's like a game, trying to push the limits, to see just how fast you can go. And with the Blazing Fast RSS Watcher, I'm doing just that. With Rust, we can indeed max out the news wire.

I'm not just creating an RSS watcher. I're creating the fastest RSS watcher. One that can keep up with the rapid pace of the financial world. One that can deliver news as it happens, giving us the edge we need to stay ahead.

And the best part? I'm just getting started. With plans for full websub support and a Docker image, the future of the Blazing Fast RSS Watcher is looking brighter (and faster) than ever.

As I prepare to deploy this tool on a Linux server in the cloud, I reflect on the experience that trying new things can be. The combination of instant alerts, Rust programming, and the challenge of low latency, all bundled into a project that's practical for our trading desk at Mechanism Capital, has made this not just a task, but a labor of love.

The next time you find yourself needing a similar solution, I highly recommend giving Rust a shot. Its performance and memory-safety, combined with its modern syntax, makes it an excellent choice for developing high-performance applications.

Thanks for reading!

### P.S. For Those Who Care

Rust has some truly beautiful syntax. Any chance one gets to flex the `match` syntax, one should take it. Here's a snippet from the configuration module:

```rust
        match mode.as_str() {
            "test" | "http" => {}
            "telegram" => {
                dotenv().ok();
                chat_id = Some(
                    env::var("CHAT_ID").expect("CHAT_ID not found. Please set it in the .env file"),
                );
                bot_token = Some(
                    env::var("BOT_TOKEN")
                        .expect("BOT_TOKEN not found. Please set it in the .env file"),
                );
            }
            _ => {
                eprintln!(
                    "Invalid mode: {}. Please choose one of: test, telegram, http",
                    mode
                );
                std::process::exit(1);
            }
        }
```

And also, it's not so bad sending a Telegram message:

```rust
    let message = format!("<b>{}</b>\n\n{}", title, description);
    let parse_mode = String::from("HTML");
    let disable_web_page_preview = String::from("true");
    let reply_markup = format!(
        "{{\"inline_keyboard\":[[{{\"text\":\"Open Article on Coindesk\",\"url\":\"{}\"}}]]}}",
        link
    );

    client
        .post(format!(
            "https://api.telegram.org/bot{}/sendMessage",
            bot_token
        ))
        .form(&[
            ("chat_id", chat_id),
            ("text", &message),
            ("parse_mode", &parse_mode),
            ("disable_web_page_preview", &disable_web_page_preview),
            ("reply_markup", &reply_markup),
        ])
        .send()
        .await?;
```