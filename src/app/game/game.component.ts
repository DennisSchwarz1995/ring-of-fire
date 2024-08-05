import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  cardAnimationPlaying = false;
  currentCard: string = '';
  game!: Game;

  constructor(private dialog: MatDialog) {
    this.startNewGame();
  }

  startNewGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.cardAnimationPlaying) {
      this.currentCard = this.game.stack.pop() as string;
      this.cardAnimationPlaying = true;

      console.log('New Card:', this.currentCard);
      console.log('Game:', this.game);
    }

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.cardAnimationPlaying = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
       this.game.players.push(name);
    });
  }
}
