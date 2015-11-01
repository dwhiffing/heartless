# Ideas
  Various ideas for the game
## Hearts
### Pure hearts
  Having a pure set of hearts should give some kind of extra bonus:
    * Red: enemies that are killed by a hit explode and fire off shrapnel
    * Yellow: take half damage from shooting/move faster
    * Blue: shots split after their first impact

### Jump enhancment
  When consuming, player should be tinted based on the hearts consumed, enhancing that jump
    * Red: jump higher
    * Yellow: move faster in air
    * Blue: fall slower

## Enemies
  Each colour should have an air based counter part that attacks from above periodically (These appear later in the game to make things harder)
    * Red: places itself diagonally in front of player and periodically shoots, player must jump on it while it is shooting
    * Yellow: swoops down at player, must jump at the right time to land on it
    * Blue: shadow slowly grows over area, blue falls and damages/stuns player if nearby

## Misc
  * gun and bullets should get tinted based on the hearts

orange green and purple should have unique attributes
these are temporary power ups you can get by getting special amounts of each heart before consuming
ideas:
  invincible (3 red, 3 blue) - Purple
  keep combo through jumps (3 Yellow, 3 Red) - Orange
  double hearts (3 Yellow, 3 Blue) - Green
  double points (3 Red, 3 Yellow, 3 Blue) - Black

debug keys to add:
  add hearts to player (with 1, 2, 3)
  show physics bodies of player and enemy (either or both, p/o)
  change amount of enemies spawning and type (control ratio of each individually and display the current rates on screen)

State shape:
  Heartless
    Phaser.Sprite
      Entity
        Player
          Shadow
          LifeHeart
        Enemy
      Arrow
      Heart
    Phaser.Group
      Bow
      HeartFactory
    Phaser.Text
      PointText
