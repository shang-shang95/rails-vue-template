FROM ruby:2.5.1-slim-stretch
ENV ROOT="/usr/src/app" \
		LANG="C.UTF-8"
WORKDIR $ROOT

RUN apt-get update -qq && \
	apt-get install -y \
	build-essential \
	patch \
	ruby-dev \
	zlib1g-dev \
	liblzma-dev \
	curl \
	libxslt-dev \
	libxml2 \
	libxml2-dev \
	libgmp-dev \
	pkg-config \
	default-libmysqlclient-dev && \
	curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
	apt-get install -y nodejs && \
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ rc main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && \
	apt-get install -y yarn && \
	gem install bundler -v 1.17.2 --no-document && \
	rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock ./
RUN bundle config build.nokogiri --use-system-libraries && \
		bundle install -j4 --clean

COPY package.json yarn.lock ./
RUN yarn install && \
		rm -rf /usr/local/share/.cache

COPY . ./
