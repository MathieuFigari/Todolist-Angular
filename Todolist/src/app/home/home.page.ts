import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService, Task } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  updatedDate: string;
  tasks = [];
  myTitleTask = "";
  myDescriptionTask = "";
  addTaskBool: boolean;
  task: Task = null;
  myEmail = "";
  myPassword = "";
  loggedBool: boolean;
  userData: any ;

  constructor(private dataService: DataService, private modalCtrl : ModalController) {
    this.dataService.getTasks().subscribe(res => {
    this.tasks = res; 
    })
    const date = new Date();
   this.currentDate = date.toLocaleDateString('fr-FR');
   const user = JSON.parse(localStorage.getItem('user'))

    if( user ) {
      this.loggedBool = !this.loggedBool;
    }
  }

  async openTask(task) { 
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: task.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    modal.present()
  }
  



  showForm() {
    this.addTaskBool = !this.addTaskBool;
    this.myTitleTask = '';
    this.myDescriptionTask = '';
  }


 addTask() {
   if(this.myTitleTask === "") {
     alert("veuillez entrer un titre")
   } else {  
 this.dataService.addTask({title: this.myTitleTask, description: this.myDescriptionTask, create_date: this.currentDate, update_date: this.currentDate})
this.showForm();
   }

}

deleteTask() {
 this.dataService.deleteTask(this.task);
  this.modalCtrl.dismiss()

}

login() {
  if (this.myEmail === '' ) {
    alert("veuillez entrer un email")
  } else if(this.myPassword === '') {
    alert("veuillez entrer un mot de passe")
  } else {

  
  this.dataService.login({email: this.myEmail, password: this.myPassword})
  .then((res) => {
    console.log(res)
    this.userData = res;
    localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
    this.loggedBool = !this.loggedBool;
    this.myEmail = "";
    this.myPassword = "";



  }).catch((error) => {
    console.log(error)
    localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
    alert("veuillez reessayer")
  })
}
}

logout() {
  this.dataService.logout()
  .then(() =>  {
    localStorage.removeItem('user');
    this.loggedBool = !this.loggedBool
  })
  .catch((e) => console.log(e.message))
}




}
