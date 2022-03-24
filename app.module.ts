import { TableService } from './table/table.service';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./table/table.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, TableComponent, AddUserComponent],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
