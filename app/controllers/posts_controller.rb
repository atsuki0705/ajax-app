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


    def checked
      # binding.pry
      post = Post.find(params[:id])
      # 設定したURLパラメーターから、既読したメモのidが渡されるように設定.
      # そのidを使用して該当するレコードを取得
      if post.checked  # 既読回中を判断するif文
        post.update(checked: false)
        # updateというActiveRecordのメソッドを使用して更新
      else
        post.update(checked: true)
      end
  
      item = Post.find(params[:id])
      # 更新したレコードをitem = Post.find(params[:id])で取得し直し、
      render json: { post: item }
      # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却
    end
end
