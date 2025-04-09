import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  estatisticas = {
    consultas: '+ 500',
    conteudos: '+ 15 mil',
    psicologos: '+ 200',
    pacientes: '+ 300'
  };

}
