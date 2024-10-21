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
        /// The amount of health this player has.
        /// </summary>
        public int Health { get; protected set; }

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
        /// The x coordinate of the wizard.
        /// </summary>
        public int X { get; protected set; }

        /// <summary>
        /// The y coordinate of the wizard.
        /// </summary>
        public int Y { get; protected set; }


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
        }



        // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // you can add additional method(s) here.
        // <<-- /Creer-Merge: methods -->>
        #endregion
    }
}
