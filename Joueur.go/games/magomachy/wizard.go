package magomachy

// Wizard is the wizard default.
type Wizard interface {
	// Parent interfaces
	GameObject

	// -- Attributes -- \\

	// Aether is the amount of spell resources this Player has.
	Aether() int64

	// Attack is the attack value of the player.
	Attack() int64

	// Defense is the defense value of the player.
	Defense() int64

	// Health is the amount of health this player has.
	Health() int64

	// Owner is the Player that owns and can control this Unit, or nil
	// if the Unit is neutral.
	//
	// Value can be returned as a nil pointer.
	Owner() Player

	// Specialty is specific type of Wizard.
	//
	// Literal Values: "aggressive", "defensive", "sustaining", or
	// "strategic"
	Specialty() string

	// Speed is the speed of the player.
	Speed() int64

	// X is the x coordinate of the wizard.
	X() int64

	// Y is the y coordinate of the wizard.
	Y() int64
}
