import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private communitiesService: CommunitiesService) {}

  @Get('all')
  async findCommunties() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  async findCommunityByID(@Param('id') id) {
    return await this.communitiesService.findByID(id);
  }

  @Get()
  async findCommunityByName(@Body('name') name: string) {
    return await this.communitiesService.findByName(name);
  }

  @Get('members/:id')
  async findCommunityMembers(@Param('id') id) {
    return await this.communitiesService.findUsers(id);
  }

  @Post()
  async createCommunity(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.communitiesService.create({ name, description });
  }

  @Put(':id')
  async updateCommunity(
    @Param('id') id,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return await this.communitiesService.update(id, { name, description });
  }

  @Delete(':id')
  async deleteCommunity(@Param('id') id) {
    return await this.communitiesService.remove(id);
  }

  @Get('members/user/:id')
  async findUserCommunities(@Param('id') id) {
    return await this.communitiesService.findByUser(id);
  }

  @Put('members/:id')
  async addUserToCommunity(
    @Param('id') id,
    @Body('userid') userid,
    @Body('username') username: string,
  ) {
    return await this.communitiesService.addUser(id, { id: userid, username });
  }

  @Delete('members/:id')
  async removeUserToCommunity(
    @Param('id') id,
    @Body('userid') userid,
    @Body('username') username: string,
  ) {
    return await this.communitiesService.removeUser(id, {
      id: userid,
      username,
    });
  }
}
