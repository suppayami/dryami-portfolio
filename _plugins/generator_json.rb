module Jekyll
    require 'json'
    require 'active_support/core_ext/integer/inflections'

    class PostJSON < StaticFile
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
                :date       =>  post.date.strftime("%B #{post.date.day.ordinalize}, %Y").downcase,
            }

            json = JSON.generate(hash)
            FileUtils.mkpath(path) unless File.exists?(path)

            file = File.new("#{path}raw.json", "w+")
            file.write(json)
            file.close

            true
        end
    end

    class CategoryJSON < StaticFile
        def initialize(site, category)
            super(site, "", "", "")
            @category = category
        end

        def write(dest)
            path  = "#{dest}/category/"
            posts = []

            @site.posts.each do |post|
                next unless post.categories.include?(@category) || @category.upcase == "ALL"
                description = post.data['description'] rescue ""
                hash = {
                    :title       =>  post.title,
                    :categories  =>  post.categories,
                    :date        =>  post.date.strftime("%B #{post.date.day.ordinalize}, %Y").downcase,
                    :description =>  description,
                }
                
                posts.push(hash)
            end

            json = JSON.generate(posts)
            FileUtils.mkpath(path) unless File.exists?(path)

            file = File.new("#{path}#{@category}.json", "w+")
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
                site.static_files << PostJSON.new(site, post)
                post.data['drdate'] = post.date.strftime("%B #{post.date.day.ordinalize}, %Y").downcase
            end
            site.static_files << CategoryJSON.new(site, "all")
        end
    end
end