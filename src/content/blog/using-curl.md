---
title: "curlコマンドのきほんと使用例"
description: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro."
pubDate: "Jul 01 2022"
heroImage: "/placeholder-hero.jpg"
---

## 環境

- windows10
- gitbash 2.32.0.1

## Curlコマンドとは

> cURLとは、主にUNIX系OSでよく利用されるコマンドおよびプログラムの一つで、様々なプロトコル（通信手順）を用いてURLで示されるネットワーク上の場所との間でデータの送受信を行うもの。オープンソースソフトウェアとして公開されている。

 

![masayan](images/cropped-masayan.png)

masayan

curlコマンドはHTTPSやFTP, Telnet, SMTP, IMAP, POP3など様々な通信プロトコルを駆使して、コマンドライン上からデータ転送を行うことができるコマンドです。

 

例えば、APIサーバー等へプログラム上からではなく、サクッとGET、POSTなどのリクエストを送りたいなどの場合に有用です。

https://youtu.be/\_hgBdyUdsJY

## GETリクエスト例

### シンプルにGET

```
curl https://www.google.com/
```

### GETした内容をhtmlに出力

curl -o <出力パス> <url>

```
curl -o /c/Users/username/Desktop/hoge.html https://www.google.com/
```

### HTTPリクエストヘッダーも取得したい

\-vで、content-typeやら、user-agent、cookieなどのリクエストヘッダを表示可能

```
curl -v https://www.google.com/
```

### Basic認証対応

```
curl -u <id>:<password> https://sample.com/
```

### レスポンスヘッダのみ取得

```
curl -I https://www.google.com/

HTTP/2 200
server: nginx
date: Wed, 03 Nov 2021 02:51:50 GMT
content-type: text/html; charset=UTF-8
//
```

### cookieを送信

\-bで可能

```
curl -b "hoge_session=qazwsxedcqwertyuui" https://sample.com/api/foo
```

### _グローバルIP取得_

以下のコマンドで、現在インターネットに接続している_グローバルIPやタイムゾーンなどを_確認できる

※こういったサイトなどで確認するのと同義

https://www.ugtop.com/spill.shtml

```
curl ipinfo.io
```

## POSTリクエスト例

### シンプルにPOST

\-XでHTTPのリクエストメソッドを指定可能。また、リクエストデータは-dで複数指定可能

```
curl -X POST -d "token=XXXXXXXX" https://sample.com/api/hoge
curl -X POST -d "email=XXXXXXXX" -d "password=YYYYYYY" https://sample.com/api/login
```

### JSONをPOST

\-H(ヘッダーオプション)をjson形式であることを明示する必要がある

```
curl -X POST -H "content-type: application/json" \ -d '{"category": "pasta"}' https://sample.com/
```

### jsonファイルを指定

@でファイルを指定できる

```
curl -X POST -H "content-type: application/json" \ -d @hoge.json https://sample.com/
```

## その他のTips

### ブラウザのリクエストをcURLで取得

上記では、curlコマンドを一から書いていますが、Google Chrome）のdevtoolで ブラウザが送信したリクエストをcURLのコマンドライン形式でコピーできます。これにより、シェルスクリプトとcURLを使って、リクエストの自動化が簡単に実現できます。

Networkタブ -> 右クリックCopy as cURL

![](images/img_6181f35d2a942.png)

### ベンチマーク

curl -wでHTTPリクエストのレスポンスタイムをとることが可能です

time\_totalの部分はいろんなパラメーターが指定できる

```
curl https://sample.com -w"%{time_total}\n"

// 0.613465
```

なお、-s でダウンロード進捗の表示を消し、ダウンロードした内容は不要なので -oでdev/nullに破棄することが可能

```
curl https://sample.com -s -o /dev/null \ -w "%{time_total}\n"
```

## もっと便利なツール

ここまで説明しておいてなんですが、vscodeの拡張機能**Thunder Client**を使用すると、GUI上で簡単にリクエストを送信することができます

https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client

![](images/img_6437f83b9e5c2.png)

以上です。頻繁に使用するものではないですが、必要な時の索引として誰かの役に立てばと思います。

## Linux学習におすすめの書籍

\[rakuten id="book:20398457" kw="Linuxのはじめ方"\]
