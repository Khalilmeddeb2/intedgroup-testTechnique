import { Component, OnInit } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ArticleService } from 'src/app/_services/article.service';
import { CommentService } from 'src/app/_services/comment.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articleList : any
  BaseUrl = environment.baseUrl.split('/api')[0] + '/media/articles/';
  commentsByArticle: { [key: string]: any[] } = {};
  activeCommentPostId: string | null = null;
  newComment: string = '';
  curentUser :any
  articleToDeleted: any;
  constructor(private articleService : ArticleService ,
              private commentService: CommentService,
              private notificationService : NotificationService,
              public iziToast: Ng2IzitoastService) { }

  ngOnInit(): void {
    this.curentUser = localStorage.getItem('user')
    this.curentUser = JSON.parse(this.curentUser);
    this.getArticles()
  }

  getArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articleList = data.map(article => ({
        ...article,
        likes: Array.isArray(article.likes) ? article.likes : []
      }));

      this.articleList.forEach((article) => {
        this.getCommentsForArticle(article._id);

        this.notificationService.onNewComment(article._id, (newComment) => {
          if (!this.commentsByArticle[article._id]) {
            this.commentsByArticle[article._id] = [];
          }
          this.commentsByArticle[article._id].unshift(newComment);
        });
      });
    });
  }

  getCommentsForArticle(articleId: string) {
    this.commentService.getCommentsByPost(articleId).subscribe((comments: any[]) => {
      this.commentsByArticle[articleId] = comments;
    });
  }

  addComment(articletId: string) {
    let comment = {
      user: {
        firstName: this.curentUser.firstName,
        lastName: this.curentUser.lastName,
      },
      message: this.newComment,
      createdAt: new Date(),
    };
  
    this.newComment = '';
    this.activeCommentPostId = null;
    this.commentService.addComment(articletId, comment).subscribe((e) => {
    });
  }

  toggleCommentInput(articletId: string) {
    this.activeCommentPostId = this.activeCommentPostId === articletId ? null : articletId;
    this.newComment = '';
  }

 likeArticle(articleId){
  this.articleService.likeArticle(articleId).subscribe((post :any) => {
    const index = this.articleList.findIndex(p => p._id === articleId)
    this.articleList[index].likes = post.likes
  }); 
 }
  shareArticle(article){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (article.shares.includes(user.id)) {
      this.iziToast.error({
            message: 'Vous avez déja partager cet article.',
            position: 'topRight'
          });
    }
    else{
    this.articleService.shareArticle(article._id).subscribe({
      next: () => {
        this.iziToast.success({
                message: 'Article partagé avec succès !',
                position: 'topRight'
              });
      let articleShared = article.shares.push(user.id)
      this.articleList[articleShared._id] = articleShared

      },
      error: (error) => {
          this.iziToast.error({
            message: 'Erreur lors du partage de l\'article.',
            position: 'topRight'
          });
      }
    });
  }
  }
  isLikedByUser(article: any): boolean {
    if (!article.likes || !Array.isArray(article.likes)) {
      return false;
    }
    const userId = this.curentUser?.id || this.curentUser?._id; // selon la structure
    if (!userId) {
      return false;
    }
    return article.likes.indexOf(userId) > -1;
  }

  getArticleToDeleted(article){
    this.articleToDeleted = article
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.articleToDeleted._id).subscribe({
      next: () => {
        this.articleList = this.articleList.filter(r => r._id !== this.articleToDeleted._id);
        this.iziToast.success({
                message: 'Article supprimé avec succès !',
                position: 'topRight'
              });
      },
      error: (error) => {
        if (error.error?.message === 'Access denied. Only admins can delete articles.') {
          this.iziToast.error({
            message: 'Seuls les administrateurs peuvent supprimer des articles.',
            position: 'topRight'
          });
        } else {
          this.iziToast.error({
            message: 'Erreur lors de la suppression de l\'article.',
            position: 'topRight'
          });
        }
      }
    });
  }



}
