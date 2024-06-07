import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: any[]) => this.users = users);
  }
  updatedUserName: string = '';
toggleEditMode(user: any) {
  user.editMode = !user.editMode;
}
  createUser(name: string) {
    const newUser = { name };
    this.userService.createUser(newUser)
      .subscribe((user: any) => {
        this.users.push(user);
      });
  }

  updateUser(user: any) {
    this.userService.updateUser(user)
      .subscribe((updatedUser: { id: any; }) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      });
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user.id)
      .subscribe((deletedUser: { id: any; }) => {
        const index = this.users.findIndex(u => u.id === deletedUser.id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      });
  }
}