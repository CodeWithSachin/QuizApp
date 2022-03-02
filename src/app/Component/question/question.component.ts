import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public email : string="";
  public questionList : any = [];
  public currentQuestion : number = 0;
  public points:number = 0;
  counter:number = 60;
  correctAnswer:number =0;
  inCorrectAnswer:number =0;
  interval$: any;
  progress:string="0";
  isQuizCompleted:boolean=false;
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.email = localStorage.getItem("email")!;
    this.getAllQuestion();
    this.startCounter();
  }
  getAllQuestion(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.question;
      console.log(res.question);
    })
  }
  nextQuestion(){
    this.currentQuestion++;
    this.resetCounter();
    if(this.currentQuestion === this.questionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }
  }
  previousQuestion(){
    this.currentQuestion--;
    this.resetCounter();
  }
  answer(currentQno:number,option:any){
    if(currentQno+1===this.questionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgress();
        this.resetCounter();
      }, 1000);
    }else{
      setTimeout(() => {
        this.points-=10;
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.getProgress();
        this.resetCounter();
      }, 1000);
    }
  }
  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 60000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }
  resetQuestion(){
    this.getAllQuestion();
    this.currentQuestion=0;
    this.points=0;
    this.resetCounter();
    this.getProgress();
  }
  getProgress(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
