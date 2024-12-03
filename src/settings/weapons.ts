import coalTexture from '../img/coal.png'
export default {
    assaultRifle: {
        name: "Basic",
        ammo: -1, // -1 为无限
        Trigger: 'J',
        cooldown: 10,
        active: true,
        direction: 90,
        trackingMode:0, //  straight: 0, //直线    target: 1, //目标追踪    point: 2, //点追踪    curve: 3, //曲线    random: 4, //随机
        speed: 10,
        skin: coalTexture,
    },
    
}