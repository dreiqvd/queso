import {
  afterRenderEffect,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from 'matter-js';

@Component({
  selector: 'app-home-experience',
  templateUrl: './home-experience.component.html',
  styleUrl: './home-experience.component.scss',
})
export class HomeExperienceComponent {
  @ViewChild('matterContainer') matterContainer!: ElementRef<HTMLCanvasElement>;

  constructor() {
    afterRenderEffect(() => {
      this.initializeMatterBackdrop();
    });
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => this.initializeMatterBackdrop());
  // }

  private initializeMatterBackdrop(): void {
    // create engine
    const engine = Engine.create();
    const world = engine.world;

    const element = this.matterContainer.nativeElement;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const render = Render.create({
      canvas: element,
      engine: engine,
      options: {
        width,
        height,
        showAxes: true,
        // hasBounds: true,
        showCollisions: true,
        showConvexHulls: true,
        // showStats: true,
        // showPositions: true,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const bodyA = Bodies.rectangle(100, 300, 50, 50, {
        isStatic: true,
        render: { fillStyle: '#3498db' },
      }),
      bodyB = Bodies.rectangle(200, 200, 50, 50),
      bodyC = Bodies.rectangle(300, 200, 50, 50),
      bodyD = Bodies.rectangle(400, 200, 50, 50),
      bodyE = Bodies.rectangle(550, 200, 50, 50),
      bodyF = Bodies.rectangle(700, 200, 50, 50),
      bodyG = Bodies.circle(400, 100, 25, { render: { fillStyle: '#3498db' } });

    // add compound body
    const partA = Bodies.rectangle(600, 200, 120 * 0.8, 50 * 0.8, {
        render: { fillStyle: '#3498db' },
      }),
      partB = Bodies.rectangle(660, 200, 50 * 0.8, 190 * 0.8, {
        render: { fillStyle: '#3498db' },
      }),
      compound = Body.create({
        parts: [partA, partB],
        isStatic: true,
      });

    Body.setPosition(compound, { x: 600, y: 300 });

    Composite.add(world, [
      bodyA,
      bodyB,
      bodyC,
      bodyD,
      bodyE,
      bodyF,
      bodyG,
      compound,
    ]);

    Composite.add(world, [
      // walls
      // 600 = height; width = 800
      Bodies.rectangle(0, 0, width * 2, 10, { isStatic: true }),
      Bodies.rectangle(0, height, width * 2, 10, { isStatic: true }),
      Bodies.rectangle(0, 0, 10, height * 2, { isStatic: true }),
      Bodies.rectangle(width, 0, 10, height * 2, { isStatic: true }),
    ]);

    let lastTime = 0;
    let scaleRate = 0.6;

    Events.on(engine, 'beforeUpdate', function (event) {
      const timeScale = 1000 / 60 / 1000;

      if (scaleRate > 0) {
        Body.scale(bodyF, 1 + scaleRate * timeScale, 1 + scaleRate * timeScale);

        // modify bodyE vertices
        bodyE.vertices[0].x -= 0.2 * timeScale;
        bodyE.vertices[0].y -= 0.2 * timeScale;
        bodyE.vertices[1].x += 0.2 * timeScale;
        bodyE.vertices[1].y -= 0.2 * timeScale;
        Body.setVertices(bodyE, bodyE.vertices);
      }
      // make bodyA move up and down
      const py = 300 + 100 * Math.sin(engine.timing.timestamp * 0.002);

      // move body and update velocity
      Body.setPosition(bodyA, { x: 100, y: py });

      // move compound body move up and down and update velocity
      Body.setPosition(compound, { x: 600, y: py });

      // rotate compound body and update angular velocity
      Body.rotate(compound, 1 * Math.PI * timeScale);

      // after first 0.8 sec (simulation time)
      if (engine.timing.timestamp >= 800) Body.setStatic(bodyG, true);

      // every 1.5 sec (simulation time)
      if (engine.timing.timestamp - lastTime >= 1500) {
        Body.setVelocity(bodyB, { x: 0, y: -10 });
        Body.setAngle(bodyC, -Math.PI * 0.26);
        Body.setAngularVelocity(bodyD, 0.2);

        // stop scaling
        scaleRate = 0;

        // update last time
        lastTime = engine.timing.timestamp;
      }
      // add mouse control
      const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

      Composite.add(world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      // context for MatterTools.Demo
      return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function (): void {
          Render.stop(render);
          Runner.stop(runner);
        },
      };
    });
  }
}
