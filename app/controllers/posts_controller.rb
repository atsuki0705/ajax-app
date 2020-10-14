class PostsController < ApplicationController

  def index
    # @post = "これはコントローラーで定義したインスタンス変数を確認するための文字列です"
    # @post = Post.find(1)  # 1番目のレコードを@postに代入
    # @posts = Post.all  # すべてのレコードを@postに代入
    @posts = Post.all.order(id: "DESC")
        # idをDESC（降順）で並び替える
  end


  def create
    Post.create(content: params[:content])
    # contentというカラムに、params[:content(new.htmlのform.text_field)]の情報を保存
    redirect_to action: :index
    end
end
