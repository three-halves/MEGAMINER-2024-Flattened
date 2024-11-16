// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// This contains implementation details, written by code, and only useful to code

#include "magomachy.hpp"
#include "../../../joueur/src/register.hpp"

#include "../../../joueur/src/exceptions.hpp"

namespace cpp_client
{

namespace magomachy
{

//register the game
Game_registry registration("Magomachy",
                           "f1142b67ad37b7598b8ab4edf7cc83a3fe5917325cb18fd1c4ff08417f982fb4",
                           std::unique_ptr<Magomachy>(new Magomachy));

std::unique_ptr<Base_ai> Magomachy::generate_ai()
{
    return std::unique_ptr<Base_ai>(new AI);
}

std::shared_ptr<Base_object> Magomachy::generate_object(const std::string& type)
{
    if(type == "GameObject")
    {
        return std::make_shared<Game_object_>();
    }
    else if(type == "Item")
    {
        return std::make_shared<Item_>();
    }
    else if(type == "Player")
    {
        return std::make_shared<Player_>();
    }
    else if(type == "Tile")
    {
        return std::make_shared<Tile_>();
    }
    else if(type == "Wizard")
    {
        return std::make_shared<Wizard_>();
    }
    throw Unknown_type("Unknown type " + type + " encountered.");
}

} // magomachy

} // cpp_client
