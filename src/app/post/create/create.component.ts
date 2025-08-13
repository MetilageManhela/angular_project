// -------------------- IMPORTAÇÕES --------------------

// Componente base do Angular, necessário para criar qualquer componente
import { Component } from '@angular/core';

// Módulo comum do Angular, fornece diretivas como *ngIf e *ngFor
import { CommonModule } from '@angular/common';

// Serviço que você criou para interagir com a API de posts
import { PostService } from '../post.service';

// Serviço do Angular para navegação entre rotas (páginas)
import { Router } from '@angular/router';

// Módulo e classes para trabalhar com Reactive Forms
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


// -------------------- DECORAÇÃO DO COMPONENTE --------------------

@Component({
  selector: 'app-create',                       // Nome do componente usado no HTML
  standalone: true,                             // Componente independente, não precisa de módulo extra
  imports: [CommonModule, ReactiveFormsModule], // Módulos usados dentro deste componente
  templateUrl: './create.component.html',       // Arquivo HTML do template
  styleUrls: ['./create.component.css']         // Arquivo CSS com os estilos do componente
})

export class CreateComponent {

  // -------------------- VARIÁVEIS --------------------

  // "form" será o objeto que controla o formulário inteiro (todos os campos)
  form!: FormGroup;


  // -------------------- CONSTRUTOR --------------------
  // Recebe os serviços que o componente vai usar
  constructor(
    public postService: PostService,  // Serviço para criar posts via API
    private router: Router            // Serviço para navegar entre páginas
  ) { }

  // -------------------- MÉTODO DE INICIALIZAÇÃO --------------------
  // Chamado automaticamente quando o componente é carregado
  ngOnInit(): void {
    // Inicializa o formulário com dois campos: title e body
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]), // Campo obrigatório
      body: new FormControl('', Validators.required)     // Campo obrigatório
    });

  }
  // -------------------- GETTER PARA OS CAMPOS --------------------
  // Facilita o acesso aos campos do formulário no HTML
  // Exemplo: f['title'] retorna o FormControl do título
  get f() {
    return this.form.controls;
  }
  // -------------------- MÉTODO SUBMIT --------------------
  // Chamado quando o formulário é enviado (ngSubmit)
  submit(): void {

    // Mostra no console os valores preenchidos no formulário
    console.log(this.form.value);

    // Chama o serviço para criar o post na API
    this.postService.create(this.form.value).subscribe({

      next: (res: any) => {
        console.log('Post criado com sucesso!');

        // Navega para a página de listagem de posts
        // this.router.navigateByUrl('post/index');

        // Apenas para teste, exibe alerta
        alert('Post criado com sucesso!');
      },

      error: (err) => {
        console.error('Erro ao criar o post:', err);
        alert('Erro ao criar o post, veja o console para detalhes.');
      }
    });

  }

}
