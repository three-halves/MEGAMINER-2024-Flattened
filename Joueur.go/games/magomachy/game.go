package magomachy

import "joueur/base"

// Game is wizards fight to the death.
type Game interface {
	// Parent interfaces
	base.Game

	// -- Attributes -- \\

	// CurrentPlayer is the player whose turn it is currently. That
	// player can send commands. Other players cannot.
	CurrentPlayer() Player

	// CurrentTurn is the current turn number, starting at 0 for the
	// first player's turn.
	CurrentTurn() int64

	// GameObjects is a mapping of every game object's ID to the
	// actual game object. Primarily used by the server and client to
	// easily refer to the game objects via ID.
	GameObjects() map[string]GameObject

	// MapHeight is the number of Tiles in the map along the y
	// (vertical) axis.
	MapHeight() int64

	// MapWidth is the number of Tiles in the map along the x
	// (horizontal) axis.
	MapWidth() int64

	// MaxTurns is the maximum number of turns before the game will
	// automatically end.
	MaxTurns() int64

	// Players is array of all the players in the game.
	Players() []Player

	// Session is a unique identifier for the game instance that is
	// being played.
	Session() string

	// Tiles is all the tiles in the map, stored in Row-major order.
	// Use `x + y * mapWidth` to access the correct index.
	Tiles() []Tile

	// TimeAddedPerTurn is the amount of time (in nano-seconds) added
	// after each player performs a turn.
	TimeAddedPerTurn() float64

	// Wizards is array of wizards.
	Wizards() []Wizard

	// -- Tiled Game Utils -- \\

	// GetTileAt returns the Tile at a give position (x, y).
	GetTileAt(int64, int64) Tile
}
