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

bool Wizard_::cast(const std::string& spell_name, const Tile& tile)
{
    std::string order = R"({"event": "run", "data": {"functionName": "cast", "caller": {"id": ")";
    order += this->id + R"("}, "args": {)";

    order += std::string("\"spellName\":") + std::string("\"") + spell_name + "\"";

    order += std::string(",\"tile\":") + (tile ? (std::string("{\"id\":\"") + tile->id + "\"}") : std::string("null"));

    order += "}}}";
    Magomachy::instance()->send(order);
    //Go until not a delta
    std::unique_ptr<Any> info;
    //until a not bool is seen (i.e., the delta has been processed)
    do
    {
        info = Magomachy::instance()->handle_response();
    } while(info->type() == typeid(bool));
    auto doc = info->as<rapidjson::Document*>();
    auto loc = doc->FindMember("data");
    if(loc == doc->MemberEnd())
    {
       return {};
    }
    auto& val = loc->value;
    Any to_return;
    morph_any(to_return, val);
    return to_return.as<bool>();
}

bool Wizard_::move(const Tile& tile)
{
    std::string order = R"({"event": "run", "data": {"functionName": "move", "caller": {"id": ")";
    order += this->id + R"("}, "args": {)";

    order += std::string("\"tile\":") + (tile ? (std::string("{\"id\":\"") + tile->id + "\"}") : std::string("null"));

    order += "}}}";
    Magomachy::instance()->send(order);
    //Go until not a delta
    std::unique_ptr<Any> info;
    //until a not bool is seen (i.e., the delta has been processed)
    do
    {
        info = Magomachy::instance()->handle_response();
    } while(info->type() == typeid(bool));
    auto doc = info->as<rapidjson::Document*>();
    auto loc = doc->FindMember("data");
    if(loc == doc->MemberEnd())
    {
       return {};
    }
    auto& val = loc->value;
    Any to_return;
    morph_any(to_return, val);
    return to_return.as<bool>();
}


Wizard_::Wizard_(std::initializer_list<std::pair<std::string, Any&&>> init) :
    Game_object_{
        {"aether", Any{std::decay<decltype(aether)>::type{}}},
        {"attack", Any{std::decay<decltype(attack)>::type{}}},
        {"defense", Any{std::decay<decltype(defense)>::type{}}},
        {"direction", Any{std::decay<decltype(direction)>::type{}}},
        {"effectTimes", Any{std::decay<decltype(effect_times)>::type{}}},
        {"effects", Any{std::decay<decltype(effects)>::type{}}},
        {"hasCast", Any{std::decay<decltype(has_cast)>::type{}}},
        {"health", Any{std::decay<decltype(health)>::type{}}},
        {"lastSpell", Any{std::decay<decltype(last_spell)>::type{}}},
        {"lastTargetTile", Any{std::decay<decltype(last_target_tile)>::type{}}},
        {"movementLeft", Any{std::decay<decltype(movement_left)>::type{}}},
        {"owner", Any{std::decay<decltype(owner)>::type{}}},
        {"specialty", Any{std::decay<decltype(specialty)>::type{}}},
        {"speed", Any{std::decay<decltype(speed)>::type{}}},
        {"tile", Any{std::decay<decltype(tile)>::type{}}},
    },
    aether(variables_["aether"].as<std::decay<decltype(aether)>::type>()),
    attack(variables_["attack"].as<std::decay<decltype(attack)>::type>()),
    defense(variables_["defense"].as<std::decay<decltype(defense)>::type>()),
    direction(variables_["direction"].as<std::decay<decltype(direction)>::type>()),
    effect_times(variables_["effectTimes"].as<std::decay<decltype(effect_times)>::type>()),
    effects(variables_["effects"].as<std::decay<decltype(effects)>::type>()),
    has_cast(variables_["hasCast"].as<std::decay<decltype(has_cast)>::type>()),
    health(variables_["health"].as<std::decay<decltype(health)>::type>()),
    last_spell(variables_["lastSpell"].as<std::decay<decltype(last_spell)>::type>()),
    last_target_tile(variables_["lastTargetTile"].as<std::decay<decltype(last_target_tile)>::type>()),
    movement_left(variables_["movementLeft"].as<std::decay<decltype(movement_left)>::type>()),
    owner(variables_["owner"].as<std::decay<decltype(owner)>::type>()),
    specialty(variables_["specialty"].as<std::decay<decltype(specialty)>::type>()),
    speed(variables_["speed"].as<std::decay<decltype(speed)>::type>()),
    tile(variables_["tile"].as<std::decay<decltype(tile)>::type>())
{
    for(auto&& obj : init)
    {
      variables_.emplace(std::make_pair(std::move(obj.first), std::move(obj.second)));
    }
}

Wizard_::~Wizard_() = default;

void Wizard_::resize(const std::string& name, std::size_t size)
{
    if(name == "effectTimes")
    {
        auto& vec = variables_["effectTimes"].as<std::decay<decltype(effect_times)>::type>();
        vec.resize(size);
        return;
    }
    else if(name == "effects")
    {
        auto& vec = variables_["effects"].as<std::decay<decltype(effects)>::type>();
        vec.resize(size);
        return;
    }
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
    if(name == "effectTimes")
    {
        using type = std::decay<decltype(effect_times)>::type;
        auto& vec = variables_["effectTimes"].as<type>();
        for(auto&& val : values)
        { 
            vec[val.first] = std::move(val.second.as<type::value_type>());
        }
        return;
    } 
    else if(name == "effects")
    {
        using type = std::decay<decltype(effects)>::type;
        auto& vec = variables_["effects"].as<type>();
        for(auto&& val : values)
        { 
            vec[val.first] = std::move(val.second.as<type::value_type>());
        }
        return;
    } 
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
   if(member == "lastTargetTile")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
      return;
   }
   if(member == "owner")
   { 
      to_change->as<Player>() = std::static_pointer_cast<Player_>(ref);
      return;
   }
   if(member == "tile")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
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
