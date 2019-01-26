require "rack/proxy"

class AssetsPathProxy < Rack::Proxy
  def perform_request(env)
    if env["PATH_INFO"].include?("/images/")
      if Rails.env != "production"
        dev_server = env["HTTP_HOST"].gsub(":3000", ":3035")
        env["HTTP_HOST"] = dev_server
        env["HTTP_X_FORWARDED_HOST"] = dev_server
        env["HTTP_X_FORWARDED_SERVER"] = dev_server
      end
      env["PATH_INFO"] = "/public/assets/images/" + env["PATH_INFO"].split("/").last
      super
    else
      @app.call(env)
    end
  end
end
