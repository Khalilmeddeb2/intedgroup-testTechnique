import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/_services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {

  articleId: string | null = null;
  article: any = null;
  imageUrl: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');

    if (this.articleId) {
      this.articleService.incrementView(this.articleId).subscribe();
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (data) => {
          this.article = data;
          this.imageUrl = `${environment.baseUrl.split('/api')[0]}/media/articles/${data.key}/${data.image}`;
        },
        error: (err) => {
           this.goBack()
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/accueil/articles']);
  }

}
