import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor ( private router:Router) { }
    apiList = [
      { 
        title: 'Public APIs for Open Data', 
        description: 'OpenStreetMap, NASA, World Bank, GeoNames, and Open Library APIs provide a lot of useful data.',
        image: 'assets/img/world.gif',
        path:'public'
      },
      { 
        title: 'Weather APIs', 
        description: 'OpenWeather, Weather API, StormGlass, Visual Crossing, and WeatherBit are some APIs to fetch weather-related information.', 
        image: 'assets/img/weather.gif',
             path:'weather'
      },
      { 
        title: 'News APIs', 
        description: 'The News API, GNews, Guardian News, Current News API, and New York Times API can help developers fetch the latest news.', 
        image: 'assets/img/news.gif',
             path:'news'
      },
      { 
        title: 'AI & NLP APIs', 
        description: 'Open AI API, Gemini, Hugging Face API, Claude API, and Grok API can help developers experiment with AI models and tools.', 
        image: 'assets/img/alnlp.gif',
             path:'ainlp'
      },
      { 
        title: 'Sports API', 
        description: 'Football Data Org, NBA API, All Sports API, ESPN API, and API-Football can help fetch sports-related information.', 
        image: 'assets/img/sports.gif',
             path:'sports'
      },
      { 
        title: 'Miscellaneous', 
        description: 'Some interesting miscellaneous APIs are TimeZone API, Unsplash API, Marvel API, Dictionary API, and QR Generation API.', 
        image: 'assets/img/mis.gif',
             path:'miscellaneous'
      }
    ];

    onApiClick(api: any) {
      this.router.navigate(['/secure', api.path]);
    }
}
