import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Task } from '../services/data.service';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.page.html',
    styleUrls: ['modal.page.scss'],
  })

export class ModalPage implements OnInit {

    @Input() id: string;
    task: Task = null;

constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) {}


ngOnInit() {
    this.dataService.getTaskById(this.id).subscribe(res => {
        this.task = res
    });
}

async updateTask() {
    if (this.task.title === "" ){
        alert("veuillez entrer un titre")
    } else { 
    this.dataService.updateTask(this.task);
    const toast = await this.toastCtrl.create({
        message: 'tache mise à jour !',
        duration: 1000
    })
    toast.present();
}
}

async deleteTask() {
    await this.dataService.deleteTask(this.task);
    this.modalCtrl.dismiss()

}

}