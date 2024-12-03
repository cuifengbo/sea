
import ironTexture from '../img/iron.png';
import coalTexture from '../img/coal.png';
import soilTexture from '../img/soil.png';
import rockTexture from '../img/rock.png';
const setting = {
    basicShip:{
        name:"Basic Ship",
        ui:{
            "body": ironTexture,
        },
        data:{
            "speed":10
        }
    },
    basicWeapon:{
        name:"Basic Weapon",
        ui:{
            "body": coalTexture,
        },
        data:{
            "speed":10
        }
    },
    basicBullet:{
        name:"Basic Bullet",
        ui:{
            "body": soilTexture,
        },
        data:{
            "speed":10
        }
    },
}
export default setting
