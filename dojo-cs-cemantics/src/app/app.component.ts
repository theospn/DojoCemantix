import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ApiClientService} from "./service/api-client.service";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, InputTextModule, Button, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiClientService]
})
export class AppComponent {
  private apiClient = inject(ApiClientService);

  myGuess: string = "";
  hasError = false;
  myResultDistance = 0

  sendMyGuess() {
    this.apiClient.getPokemonValue({
      value: this.myGuess
    }).pipe(
      catchError(err => {
        this.myResultDistance = 0
        this.hasError = true;
        return EMPTY
      })
    ).subscribe(result=> {
      this.hasError = false;
      this.myResultDistance = Math.abs(result.value)
    });
  }
}
