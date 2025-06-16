import { Component, OnInit } from '@angular/core';
import { Chart   } from 'chart.js';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ArticleService } from 'src/app/_services/article.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  canvas: any;
  ctx: any;
  articleStats: any[] = [];

 constructor(private articleService: ArticleService,public iziToast: Ng2IzitoastService) {}

  ngOnInit(): void {
    this.articleService.getArticleStatistics().subscribe(data => {
      const titles = data.map(item => item.title);
      const likes = data.map(item => item.likes);
      const views = data.map(item => item.views);
      const shares = data.map(item => item.shares);
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: titles,
          datasets: [
            {
              label: 'Likes',
              data: likes,
              backgroundColor: '#589590'
            },
            {
              label: 'Vues',
              data: views,
              backgroundColor: '#23B1A5'
            },
            {
              label: 'Partages',
              data: shares,
              backgroundColor: '#FFC107'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
  (error)=>{
     this.iziToast.error({
              message: 'Accès refusé. Vous n’avez pas les autorisations nécessaires.',
              position: 'topRight'
            });

  });
  }
}
