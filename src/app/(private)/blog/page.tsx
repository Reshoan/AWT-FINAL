import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Plus, Edit, Eye, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function BlogPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardLayout currentPage="blog">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">Blog Management</h1>
            <p className="text-green-700">Create and manage your nutrition blog posts</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {/* Blog Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Posts</p>
                <p className="text-2xl font-bold text-green-900">24</p>
              </div>
              <Edit className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Views</p>
                <p className="text-2xl font-bold text-green-900">12.5K</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Likes</p>
                <p className="text-2xl font-bold text-green-900">1.8K</p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Comments</p>
                <p className="text-2xl font-bold text-green-900">342</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-6">Recent Blog Posts</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-green-900 mb-1">10 Superfoods for Better Health</h3>
                <p className="text-sm text-green-600 mb-2">Published 2 days ago</p>
                <div className="flex items-center space-x-4 text-sm text-green-700">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>245 views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>32 likes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>8 comments</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-green-900 mb-1">The Science of Meal Timing</h3>
                <p className="text-sm text-green-600 mb-2">Published 1 week ago</p>
                <div className="flex items-center space-x-4 text-sm text-green-700">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>892 views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>67 likes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>23 comments</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-green-900 mb-1">Hydration: More Than Just Water</h3>
                <p className="text-sm text-green-600 mb-2">Published 2 weeks ago</p>
                <div className="flex items-center space-x-4 text-sm text-green-700">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>1.2K views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>89 likes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>34 comments</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-green-200 bg-transparent">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
