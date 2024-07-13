export const wait = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  };

export const popUpTrabsitionDuration = 200;
export const questionTabTransitionDuration = 100;