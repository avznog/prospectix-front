import { Injectable } from '@angular/core';
import { Toast } from 'src/app/models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toasts = new Map<number, Toast>();
  constructor(
    
  ) { }

  addToast(toast: Toast) {
    this.toasts.set(this.toasts.size, toast)
    setTimeout(() => {
      this.removeToast(this.toasts.size - 1);
    }, 2000)
  }

  removeToast(toastId: number) {
    this.toasts.delete(toastId)
  }
}
