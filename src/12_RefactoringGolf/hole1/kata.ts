
const VIDE = ' ';
const PLATEAU_ZERO = 0;
const PLATEAU_UN = 1;
const PLATEAU_DEUX = 2;
export class Game {
  private _lastSymbol = VIDE;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == VIDE) {
      if (player == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != VIDE) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(PLATEAU_ZERO, PLATEAU_ZERO)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(PLATEAU_UN, PLATEAU_ZERO)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(PLATEAU_DEUX, PLATEAU_ZERO)!.Symbol;
    }

    return VIDE;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(PLATEAU_ZERO, PLATEAU_ZERO)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_ZERO, PLATEAU_UN)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_ZERO, PLATEAU_DEUX)!.Symbol != VIDE
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(PLATEAU_ZERO, PLATEAU_ZERO)!.Symbol == this._board.TileAt(0, PLATEAU_UN)!.Symbol &&
      this._board.TileAt(PLATEAU_ZERO, PLATEAU_DEUX)!.Symbol == this._board.TileAt(0, PLATEAU_UN)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(PLATEAU_UN, PLATEAU_ZERO)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_UN, PLATEAU_UN)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_UN, PLATEAU_DEUX)!.Symbol != VIDE
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(PLATEAU_UN, PLATEAU_ZERO)!.Symbol == this._board.TileAt(PLATEAU_UN, PLATEAU_UN)!.Symbol &&
      this._board.TileAt(PLATEAU_UN, PLATEAU_DEUX)!.Symbol == this._board.TileAt(PLATEAU_UN, PLATEAU_UN)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(PLATEAU_DEUX, PLATEAU_ZERO)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_DEUX, PLATEAU_UN)!.Symbol != VIDE &&
      this._board.TileAt(PLATEAU_DEUX, PLATEAU_DEUX)!.Symbol != VIDE
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(PLATEAU_DEUX, PLATEAU_ZERO)!.Symbol == this._board.TileAt(PLATEAU_DEUX, PLATEAU_UN)!.Symbol &&
      this._board.TileAt(PLATEAU_DEUX, PLATEAU_DEUX)!.Symbol == this._board.TileAt(PLATEAU_DEUX, PLATEAU_UN)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: VIDE };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
