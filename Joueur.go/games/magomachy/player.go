package magomachy

// Player is a player in this game. Every AI controls one player.
type Player interface {
	// Parent interfaces
	GameObject

	// -- Attributes -- \\

	// Aether is the amount of spell resources this Player has.
	Aether() int64

	// Attack is the attack value of the player.
	Attack() int64

	// ClientType is what type of client this is, e.g. 'Python',
	// 'JavaScript', or some other language. For potential data mining
	// purposes.
	ClientType() string

	// Defense is the defense value of the player.
	Defense() int64

	// Health is the amount of health this player has.
	Health() int64

	// Lost is if the player lost the game or not.
	Lost() bool

	// Name is the name of the player.
	Name() string

	// Opponent is this player's opponent in the game.
	Opponent() Player

	// ReasonLost is the reason why the player lost the game.
	ReasonLost() string

	// ReasonWon is the reason why the player won the game.
	ReasonWon() string

	// Speed is the speed of the player.
	Speed() int64

	// TimeRemaining is the amount of time (in ns) remaining for this
	// AI to send commands.
	TimeRemaining() float64

	// Wizard is the specific wizard owned by the player.
	//
	// Value can be returned as a nil pointer.
	Wizard() Wizard

	// Won is if the player won the game or not.
	Won() bool
}
