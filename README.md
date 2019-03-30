# README

## Description

Rails+Vue+Webpackを使用する際のテンプレートです。
Qiitaに記事を投稿したので[こちら](https://qiita.com/geek_shanshan/items/8f348734d95d9ece9576)を参考にご利用ください。

## Tool

- rbenv 1.1.1
- Ruby 2.5.1
- Rails 5.2.2
- yarn 1.15.2
- bundler 1.17.2
- git
- mysql 5.7.25
- VSCode 拡張機能
  - rufo
  - eslint
  - prittier
  - Vetur

## Install

```
$ bundle install --path=vendor/bundle --jobs=4
$ yarn install
$ bundle exec rails db:create
$ bundle exec foreman start -p 3000 // port3000でrailsのサーバーとwebpack-dev-serverを立てている
```

## Feature

- Babelを搭載しているのでES2018で書けます。
- ESlint + Prettierの組み合わせでVSCodeであれば保存時にフォーマットしてくれます。
- webpack-dev-serverを利用して快適に開発できます。
- fontawesome, bulma, vueが使えます。
- Docker対応を進めていますが、docker-composeのMYSQL周りが解決できていないので使用しないでください。
