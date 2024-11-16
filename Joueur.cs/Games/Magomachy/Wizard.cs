// The wizard default.

// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// Instead, you should only be reading its variables and calling its functions.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
// <<-- Creer-Merge: usings -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// you can add additional using(s) here
// <<-- /Creer-Merge: usings -->>

namespace Joueur.cs.Games.Magomachy
{
    /// <summary>
    /// The wizard default.
    /// </summary>
    public class Wizard : Magomachy.GameObject
    {
        #region Properties
        /// <summary>
        /// The amount of spell resources this Player has.
        /// </summary>
        public int Aether { get; protected set; }

        /// <summary>
        /// The attack value of the player.
        /// </summary>
        public int Attack { get; protected set; }

        /// <summary>
        /// The defense value of the player.
        /// </summary>
        public int Defense { get; protected set; }

        /// <summary>
        /// The direction this Wizard is facing.
        /// </summary>
        public int Direction { get; protected set; }

        /// <summary>
        /// The turns remaining on each active effects on Wizard.
        /// </summary>
        public IList<int> EffectTimes { get; protected set; }

        /// <summary>
        /// The names of active effects on the Wizard.
        /// </summary>
        public IList<string> Effects { get; protected set; }

        /// <summary>
        /// Whether or not this Wizard has cast a spell this turn.
        /// </summary>
        public bool HasCast { get; protected set; }

        /// <summary>
        /// Whether or not this Wizard has cast a teleport spell this turn.
        /// </summary>
        public bool HasTeleported { get; protected set; }

        /// <summary>
        /// The amount of health this player has.
        /// </summary>
        public int Health { get; protected set; }

        /// <summary>
        /// The spell this wizard just casted. Undefined if no spell was cast.
        /// </summary>
        public string LastSpell { get; protected set; }

        /// <summary>
        /// The tile this wizard just cast to. Undefined if no tile was targeted.
        /// </summary>
        public Magomachy.Tile LastTargetTile { get; protected set; }

        /// <summary>
        /// Max health of wizard.
        /// </summary>
        public int MaxHealth { get; protected set; }

        /// <summary>
        /// How much movement the wizard has left.
        /// </summary>
        public int MovementLeft { get; protected set; }

        /// <summary>
        /// The Player that owns and can control this Unit, or null if the Unit is neutral.
        /// </summary>
        public Magomachy.Player Owner { get; protected set; }

        /// <summary>
        /// Specific type of Wizard.
        /// </summary>
        public string Specialty { get; protected set; }

        /// <summary>
        /// The speed of the player.
        /// </summary>
        public int Speed { get; protected set; }

        /// <summary>
        /// Where the wizard has a teleport rune out, undefined otherwise.
        /// </summary>
        public Magomachy.Tile TeleportTile { get; protected set; }

        /// <summary>
        /// The Tile that this Wizard is on.
        /// </summary>
        public Magomachy.Tile Tile { get; protected set; }


        // <<-- Creer-Merge: properties -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // you can add additional properties(s) here. None of them will be tracked or updated by the server.
        // <<-- /Creer-Merge: properties -->>
        #endregion


        #region Methods
        /// <summary>
        /// Creates a new instance of Wizard. Used during game initialization, do not call directly.
        /// </summary>
        protected Wizard() : base()
        {
            this.EffectTimes = new List<int>();
            this.Effects = new List<string>();
        }

        /// <summary>
        /// Casts a spell on a Tile in range.
        /// </summary>
        /// <param name="spellName">The name of the spell to cast.</param>
        /// <param name="tile">The Tile to aim the spell toward.</param>
        /// <returns>True if successfully cast, false otherwise.</returns>
        public bool Cast(string spellName, Magomachy.Tile tile)
        {
            return this.RunOnServer<bool>("cast", new Dictionary<string, object> {
                {"spellName", spellName},
                {"tile", tile}
            });
        }

        /// <summary>
        /// Check if a tile can be reached with a projectile spell.
        /// </summary>
        /// <param name="tile">The Tile to aim the projectile toward.</param>
        /// <returns>True if Tile can be hit, false otherwise.</returns>
        public bool CheckBressenham(Magomachy.Tile tile)
        {
            return this.RunOnServer<bool>("checkBressenham", new Dictionary<string, object> {
                {"tile", tile}
            });
        }

        /// <summary>
        /// Moves this Wizard from its current Tile to another empty Tile.
        /// </summary>
        /// <param name="tile">The Tile this Wizard should move to.</param>
        /// <returns>True if it moved, false otherwise.</returns>
        public bool Move(Magomachy.Tile tile)
        {
            return this.RunOnServer<bool>("move", new Dictionary<string, object> {
                {"tile", tile}
            });
        }



        // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // you can add additional method(s) here.
        // <<-- /Creer-Merge: methods -->>
        #endregion
    }
}
