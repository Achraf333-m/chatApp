import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages = [];
  username = "Username";
  message = '';

  
  constructor (private http:HttpClient) {}

  ngOnInit(): void {

    const pusher = new Pusher('87a76a425043e081eb2a', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chatapp');
    channel.bind('message', (data :never) => {
      this.messages.push(data)
    });
  }

  submit():void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '')
  }
}
