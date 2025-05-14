import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/de2kwlclm/upload'; // Replace with your actual Cloudinary upload URL
  private cloudinaryResourcesUrl = 'https://api.cloudinary.com/v1_1/de2kwlclm/resources/image'; // Endpoint to fetch images
  private uploadPreset = 'material_upload'; // Replace with your Cloudinary upload preset

  constructor(private http: HttpClient) {}

  // Upload file to Cloudinary
  uploadFile(file: File, course: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('folder', `resources/${course}`); // Save file under 'resources/<course>' folder
    formData.append('resource_type', 'auto'); // ✅ Allow all file types
    
    return this.http.post<any>(this.cloudinaryUrl, formData);
  }

  // Fetch uploaded resources from Cloudinary
  fetchResources(): Observable<any> {
    const headers = new HttpHeaders({
      // Authentication headers are required by Cloudinary for API requests
      Authorization: `Basic ${btoa('229425571844966:RPF1wmiOt7P9cotNEpILyPwJnVk')}`, // Replace with your Cloudinary API credentials
    });

    // Request to fetch resources from Cloudinary
    return this.http.get<any>(this.cloudinaryResourcesUrl, { headers });
  }
}
