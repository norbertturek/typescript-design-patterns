import { Circle } from './shapes/circle.shape';
import { Rectangle } from './shapes/rectangle.shape';
import { ShapeRegistry } from './registry/shape.registry';

function clientCode() {
    console.log('--- BASIC CLONE ---');

    const originalCircle = new Circle(10, 20, 5, 'red');
    const clonedCircle = originalCircle.clone();
    clonedCircle.color = 'blue';
    clonedCircle.x = 99;

    originalCircle.describe();
    clonedCircle.describe();
    console.log('Same instance?', originalCircle === clonedCircle);

    console.log('\n--- REGISTRY ---');

    const registry = new ShapeRegistry();
    registry.register('small-red-circle', new Circle(0, 0, 5, 'red'));
    registry.register('large-green-rect', new Rectangle(0, 0, 200, 100, 'green'));

    const c1 = registry.clone<Circle>('small-red-circle');
    c1.x = 50;
    c1.y = 50;

    const c2 = registry.clone<Circle>('small-red-circle');
    c2.x = 150;
    c2.y = 150;
    c2.color = 'pink';

    const rect = registry.clone<Rectangle>('large-green-rect');
    rect.x = 10;
    rect.y = 10;

    c1.describe();
    c2.describe();
    rect.describe();
}

clientCode();
