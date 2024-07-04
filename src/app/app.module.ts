import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './shared/services/employee.service';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        EmployeeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };