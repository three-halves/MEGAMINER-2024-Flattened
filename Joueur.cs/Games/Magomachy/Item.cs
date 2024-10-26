// Objects that help the players.

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
    /// Objects that help the players.
    /// </summary>
    public class Item : Magomachy.GameObject
    {
        #region Properties
        /// <summary>
        /// The type of Item this is.
        /// </summary>
        public string Form { get; protected set; }

        /// <summary>
        /// How many turns this item has existed for.
        /// </summary>
        public int Lifetime { get; protected set; }

        /// <summary>
        /// The Tile this Item is on.
        /// </summary>
        public Magomachy.Item Tile { get; protected set; }


        // <<-- Creer-Merge: properties -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // you can add additional properties(s) here. None of them will be tracked or updated by the server.
        // <<-- /Creer-Merge: properties -->>
        #endregion


        #region Methods
        /// <summary>
        /// Creates a new instance of Item. Used during game initialization, do not call directly.
        /// </summary>
        protected Item() : base()
        {
        }



        // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // you can add additional method(s) here.
        // <<-- /Creer-Merge: methods -->>
        #endregion
    }
}
