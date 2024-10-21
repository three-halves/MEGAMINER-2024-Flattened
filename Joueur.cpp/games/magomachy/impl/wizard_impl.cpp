// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// This contains implementation details, written by code, and only useful to code



#include "../wizard.hpp"
#include "../../../joueur/src/base_ai.hpp"
#include "../../../joueur/src/any.hpp"
#include "../../../joueur/src/exceptions.hpp"
#include "../../../joueur/src/delta.hpp"
#include "../game_object.hpp"
#include "../item.hpp"
#include "../player.hpp"
#include "../tile.hpp"
#include "../wizard.hpp"
#include "magomachy.hpp"

#include <type_traits>

namespace cpp_client
{

namespace magomachy
{


Wizard_::Wizard_(std::initializer_list<std::pair<std::string, Any&&>> init) :
    Game_object_{
        {"aether", Any{std::decay<decltype(aether)>::type{}}},
        {"attack", Any{std::decay<decltype(attack)>::type{}}},
        {"defense", Any{std::decay<decltype(defense)>::type{}}},
        {"health", Any{std::decay<decltype(health)>::type{}}},
        {"owner", Any{std::decay<decltype(owner)>::type{}}},
        {"specialty", Any{std::decay<decltype(specialty)>::type{}}},
        {"speed", Any{std::decay<decltype(speed)>::type{}}},
        {"x", Any{std::decay<decltype(x)>::type{}}},
        {"y", Any{std::decay<decltype(y)>::type{}}},
    },
    aether(variables_["aether"].as<std::decay<decltype(aether)>::type>()),
    attack(variables_["attack"].as<std::decay<decltype(attack)>::type>()),
    defense(variables_["defense"].as<std::decay<decltype(defense)>::type>()),
    health(variables_["health"].as<std::decay<decltype(health)>::type>()),
    owner(variables_["owner"].as<std::decay<decltype(owner)>::type>()),
    specialty(variables_["specialty"].as<std::decay<decltype(specialty)>::type>()),
    speed(variables_["speed"].as<std::decay<decltype(speed)>::type>()),
    x(variables_["x"].as<std::decay<decltype(x)>::type>()),
    y(variables_["y"].as<std::decay<decltype(y)>::type>())
{
    for(auto&& obj : init)
    {
      variables_.emplace(std::make_pair(std::move(obj.first), std::move(obj.second)));
    }
}

Wizard_::~Wizard_() = default;

void Wizard_::resize(const std::string& name, std::size_t size)
{
    try
    {
        Game_object_::resize(name, size);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Wizard treated as a vector, but it is not a vector.");
}

void Wizard_::change_vec_values(const std::string& name, std::vector<std::pair<std::size_t, Any>>& values)
{
    try
    {
        Game_object_::change_vec_values(name, values);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Wizard treated as a vector, but it is not a vector.");
}

void Wizard_::remove_key(const std::string& name, Any& key)
{
    try
    {
        Game_object_::remove_key(name, key);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Wizard treated as a map, but it is not a map.");
}

std::unique_ptr<Any> Wizard_::add_key_value(const std::string& name, Any& key, Any& value)
{
    try
    {
        return Game_object_::add_key_value(name, key, value);
    }
    catch(...){}
    throw Bad_manipulation(name + " in Wizard treated as a map, but it is not a map.");
}

bool Wizard_::is_map(const std::string& name)
{
    try
    {
        return Game_object_::is_map(name);
    }
    catch(...){}
    return false;
}

void Wizard_::rebind_by_name(Any* to_change, const std::string& member, std::shared_ptr<Base_object> ref)
{
   if(member == "owner")
   { 
      to_change->as<Player>() = std::static_pointer_cast<Player_>(ref);
      return;
   }
   try
   {
      Game_object_::rebind_by_name(to_change, member, ref);
      return;
   }
   catch(...){}
   throw Bad_manipulation(member + " in Wizard treated as a reference, but it is not a reference.");
}


} // magomachy

} // cpp_client
