module Jekyll
    require 'json'

    class JSONFile < StaticFile
        def initialize(site, post)
            super(site, "", "", "")
            @post = post
        end

        def write(dest)
            md2html = @site.getConverterImpl(Jekyll::Converters::Markdown)
            post = @post
            path = "#{dest}#{post.url.to_s}"

            hash = {
                :title      =>  post.title,
                :categories =>  post.categories,
                :content    =>  md2html.convert(post.content),
                :date       =>  post.date,
            }

            json = JSON.generate(hash)
            FileUtils.mkpath(path) unless File.exists?(path)

            file = File.new("#{path}raw.json", "w+")
            file.write(json)
            file.close

            true
        end
    end

    class JSONGenerator < Generator
        safe true

        def generate(site)
            md2html = site.getConverterImpl(Jekyll::Converters::Markdown)
            site.posts.each do |post|
                site.static_files << JSONFile.new(site, post)
            end
        end
    end
end