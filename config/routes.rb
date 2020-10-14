Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  # form_with url: "/posts", method: :post, local: true do |form|
  # 〜〜form_withの情報とルーティングとのつながり〜〜
  # url:"/posts"⇒(rails routes)VerbのPOST
# method: ::post⇒(rails routes)URLPatternの/posts(.:format)
end
