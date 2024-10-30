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

	// Direction is the direction this Wizard is facing.
	Direction() int64

	// EffectTimes is the turns remaining on each active effects on
	// Wizard.
	EffectTimes() []int64

	// Effects is the names of active effects on the Wizard.
	Effects() []string

	// HasCast is whether or not this Wizard has cast a spell this
	// turn.
	HasCast() bool

	// Health is the amount of health this player has.
	Health() int64

	// LastSpell is the spell this wizard just casted. Undefined if no
	// spell was cast.
	//
	// Value can be returned as a nil pointer.
	LastSpell() string

	// LastTargetTile is the tile this wizard just cast to. Undefined
	// if no tile was targeted.
	//
	// Value can be returned as a nil pointer.
	LastTargetTile() Tile

	// MovementLeft is how much movement the wizard has left.
	MovementLeft() int64

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

	// Tile is the Tile that this Wizard is on.
	//
	// Value can be returned as a nil pointer.
	Tile() Tile

	// -- Methods -- \\

	// Cast casts a spell on a Tile in range.
	Cast(string, Tile) bool

	// Move moves this Wizard from its current Tile to another empty
	// Tile.
	Move(Tile) bool
}
