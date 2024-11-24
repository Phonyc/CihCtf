# CihCtf

### Chall 1

**Description:**

```
Un site web simple avec pour username et password "admin" et "admin" respectivement.
```

### Chall 2

**Description:**

```
Un site web de blog avec un page admin,
Les posts sont stockés dans un fichier json.
Le json est chargé par la page, et seuls les posts avec le champ "public" à true sont affichés.
les autres restent dans le json
Il y a des indications sur un des posts pour trouver le mdp
```

## Chall 3

**Description:**

```
Fichier de log accessible a tous (trouver l'url avec le robots.txt)
Dedans, historique de connexions manquées (avec mdp essayé, ...)
On peut y trouver le mdp tapé avec Verr Maj Activé
```

## Chall 4

**Description:**

```
Erreur de configuration -> On peut accéder à des fichiers un cran plus haut
Donc accéder au dockerfile
Donc accéder au fichier du serveur dans lequel les identifiants sont hardcodés
```

## Chall 5

**Description:**

```
Echange Wireshark dans lequel le mdp est
```

## Chall 6

**Description:**

```
Recupération du cookie admin avec une faille XSS
```