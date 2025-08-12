import L from 'leaflet';

class RoutingFormatter extends L.Routing.Formatter {
  constructor(options: L.Routing.FormatterOptions) {
    super(options);
  }

  getIconName(
    instr: L.Routing.IInstruction
  ):
    | 'depart'
    | 'via'
    | 'enter-roundabout'
    | 'arrive'
    | 'continue'
    | 'bear-right'
    | 'turn-right'
    | 'sharp-right'
    | 'u-turn'
    | 'sharp-left'
    | 'turn-left'
    | 'bear-left' {
    switch (instr.type) {
      case 'StartAt':
        return 'depart';
      case 'DestinationReached':
        return 'arrive';
      case 'SlightLeft':
        return 'bear-left';
      case 'SharpLeft':
        return 'sharp-left';
      case 'Left':
        return 'turn-left';
      case 'SlightRight':
        return 'bear-right';
      case 'SharpRight':
        return 'sharp-right';
      case 'Right':
        return 'turn-right';
      case 'TurnAround':
        return 'u-turn';
      case 'Straight':
        return 'continue';
      case 'EnterAgainstAllowedDirection':
        return 'enter-roundabout';
      case 'LeaveAgainstAllowedDirection':
        return 'bear-right';
      case 'Roundabout':
        return 'enter-roundabout';
      default:
        // fall back to the default icons if you don't have a custom one
        return 'continue';
    }
  }
}

export default RoutingFormatter;
