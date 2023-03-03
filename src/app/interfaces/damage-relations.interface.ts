export interface DamageRelation {
    double_damage_from: DoubleDamageFrom[];
    double_damage_to:   DoubleDamageFrom[];
    half_damage_from:   DoubleDamageFrom[];
    half_damage_to:     DoubleDamageFrom[];
    no_damage_from:     any[];
    no_damage_to:       DoubleDamageFrom[];
}

export interface DoubleDamageFrom {
    name: string;
    url:  string;
}
