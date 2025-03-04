import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GeonamesService } from '../../Services/geonames.service';

@Component({
  selector: 'app-publicapi',
  templateUrl: './publicapi.component.html',
  styleUrl: './publicapi.component.css'
})
export class PublicapiComponent {
  isNasaApi:boolean=false;
  isWorldbankApi:boolean=false;
  isStreetmapApi:boolean=false;
  apiKey = environment.nasaKey; // Replace with your actual API key
  selectedApi: string = '';
  apiResponse: any = null;
  apodData:any=null;
  errorResponse:any=null;
  postalCode: string = '';
  country: string = 'IN'; // Default country
  lat: number = 0;
  lng: number = 0;
  showLocationDetails = false;
  map: any;
  selectedDate: string = new Date().toISOString().split('T')[0]; // Default: Today's date
  constructor(public http:HttpClient,private sanitizer: DomSanitizer,private tostr:ToastrService,private geoService: GeonamesService) {

  }
  publicapi = [
    { 
      title: 'OpenStreetMap', 
      description: 'Provides open geographical data.', 
      image: 'assets/img/openstreetmap.jpg',
      url: 'https://www.openstreetmap.org/'
    },
    { 
      title: 'NASA API', 
      description: 'Access NASA’s space data and images.', 
      image: 'assets/img/nasa.png',
      url: 'https://api.nasa.gov/'
    },
    { 
      title: 'World Bank API', 
      description: 'Access global economic data.', 
      image: 'assets/img/worldbank.png',
      url: 'https://data.worldbank.org/'
    },
    { 
      title: 'GeoNames API', 
      description: 'Provides geographical database and location services.', 
      image: 'assets/img/geonames.jpg',
      url: 'https://www.geonames.org/'
    },
    { 
      title: 'Open Library API', 
      description: 'Access books and library data.', 
      image: 'assets/img/openlibrary.png',
      url: 'https://openlibrary.org/developers/api'
    }
  ];
  nasaApis = [
    { name: 'APOD: Astronomy Picture of the Day', url: 'https://api.nasa.gov/planetary/apod' },
    { name: 'Asteroids NeoWs', url: 'https://api.nasa.gov/neo/rest/v1/feed' },
    { name: 'DONKI: Space Weather Database', url: 'https://api.nasa.gov/DONKI/notifications' },
    { name: 'Earth Observatory Data', url: 'https://api.nasa.gov/earth/imagery' },
    { name: 'EONET: Natural Events Tracker', url: 'https://eonet.gsfc.nasa.gov/api/v2.1/events' },
    { name: 'EPIC: Earth Polychromatic Imaging Camera', url: 'https://api.nasa.gov/EPIC/api/natural/images' },
    { name: 'Exoplanet Archive', url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI' },
    { name: 'Open Science Data Repository', url: 'https://api.nasa.gov/OSDR/' },
    { name: 'Insight: Mars Weather', url: 'https://api.nasa.gov/insight_weather/' },
    { name: 'Mars Rover Photos', url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos' },
    { name: 'NASA Image and Video Library', url: 'https://images-api.nasa.gov/search' },
    { name: 'TechTransfer: NASA Patents', url: 'https://api.nasa.gov/techtransfer/patents' },
    { name: 'Satellite Situation Center', url: 'https://sscweb.gsfc.nasa.gov/WS/sscr/2/' },
    { name: 'SSD/CNEOS: Solar System Dynamics', url: 'https://ssd-api.jpl.nasa.gov/' },
    { name: 'Techport: NASA Projects', url: 'https://api.nasa.gov/techport/api/projects' },
    { name: 'TLE API: Two-Line Element Data', url: 'https://tle.ivanstanojevic.me/api/tle' },
    { name: 'Vesta/Moon/Mars Trek WMTS', url: 'https://trek.nasa.gov/' }
  ];
  onApiClick(api: any) {
    //window.open(api.url, '_blank'); // Open API link in a new tab
    if(api.title== 'NASA API'){
    this.isNasaApi=true;
    }  
    else if(api.title== 'World Bank API'){
      this.isWorldbankApi=true;
      }  
      else if(api.title== 'GeoNames API'){
        this.isStreetmapApi=true;
        }  
      
  }
  fetchApiData() {
    if (!this.selectedApi) return;

    let apiUrl = this.nasaApis.find(api => api.url === this.selectedApi)?.url;
    if (!apiUrl) return;

    // Handle APIs that require date as a parameter (e.g., APOD, Earth imagery)
    if (apiUrl.includes('apod') || apiUrl.includes('earth')) {
      apiUrl += `?api_key=${this.apiKey}&date=${this.selectedDate}`;
    } else {
      apiUrl += `?api_key=${this.apiKey}`;
    }

    this.http.get(apiUrl).subscribe(
      response => {
        
        if (apiUrl.includes('apod')) {
          this.apodData = response; 
          this.apiResponse = null;
        } else {
          this.apiResponse = response;
          this.apodData = null;
        }
      },
      error => {
        console.error('Error fetching data:', error)
        this.tostr.error(error.error.msg);
      }
    );
  }

  clearResults() {
    this.apodData = null;
    this.apiResponse = null;
  }
  changeDate(day:number){
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + day);
    this.fetchApod(newDate.toISOString().split('T')[0]);
  }
  fetchApod(date: string = this.selectedDate) {
    this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&date=${date}`)
      .subscribe((data: any) => {
        this.apodData = data;
        this.selectedDate = date; // Update current date
      });
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  fetchWordBank(date: string = this.selectedDate){
    this.http.get(`/api/api/v3/wds?format=json&rows=10&os=0&fl=docdt,docty&strdate=${date}&docty_exact=Procurement+Plan&sort=docdt&order=asc`)
    .subscribe((data: any) => {
      this.apiResponse = data;
      this.selectedDate = date; 
      });
  }
  searchLocation() {
    if (!this.postalCode) {
      this.tostr.error('Please enter a postal code');
      return;
    }

    this.geoService.getPostalCode(this.postalCode, this.country).subscribe((response:any) => {
      if (response.postalCodes.length > 0) {
        debugger
        const location = response.postalCodes[0];
        this.lat = location.lat;
        this.lng = location.lng;
        this.showLocationDetails = true;
        console.log(location);
        this.tostr.success(`Location Found: ${location.placeName}`);
      } else {
        this.tostr.error('No location found!');
      }
    }, (error:any) => {
      this.tostr.error('API Error: Unable to fetch location');
    });
  }
}